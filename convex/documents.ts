import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

import { v } from "convex/values";
export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("not authenticated ");
    }
    const userId = identity.subject;
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchive"), true))
      .order("desc")
      .collect();
    return documents;
  },
});
export const getDocuments = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("not authenticated ");
    }
    const userId = identity.subject;
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchive"), false))
      .order("desc")
      .collect();
    return documents;
  },
});
export const archive = mutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated 1");
    }
    const userId = identity.subject;
    const existDocument = await ctx.db.get(args.documentId);
    if (!existDocument) {
      throw new Error("Not Found ");
    }
    if (existDocument.userId !== userId) {
      throw new Error("Not authenticated ");
    }
    const recursiveDelete = async (parentDocument: Id<"documents">) => {
      const documentsChild = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", parentDocument)
        )
        .collect();
      for (const child of documentsChild) {
        await ctx.db.patch(child._id, {
          isArchive: true,
        });
        await recursiveDelete(child._id);
      }
    };
    const document = ctx.db.patch(args.documentId, {
      isArchive: true,
    });
    recursiveDelete(args.documentId);
    return document;
  },
});
export const unarchive = mutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated 1");
    }
    const userId = identity.subject;
    const existDocument = await ctx.db.get(args.documentId);
    if (!existDocument) {
      throw new Error("Not Found ");
    }
    if (existDocument.userId !== userId) {
      throw new Error("unauthorized ");
    }
    const recursiveUnArchive = async (parentDocument: Id<"documents">) => {
      const documentsChild = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", parentDocument)
        )
        .collect();
      for (const child of documentsChild) {
        await ctx.db.patch(child._id, {
          isArchive: false,
        });
        await recursiveUnArchive(child._id);
      }
    };
    const options: Partial<Doc<"documents">> = {
      isArchive: false,
    };
    if (existDocument.parentDocument) {
      const parent = await ctx.db.get(existDocument.parentDocument);
      if (parent?.isArchive == true || !parent) {
        options.parentDocument = undefined;
      }
    }
    await ctx.db.patch(args.documentId, options);
    recursiveUnArchive(args.documentId);
    return existDocument;
  },
});
export const get = query({
  args: { parentDocument: v.optional(v.id("documents")) },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("not authenticated ");
    }
    const userId = identity.subject;
    const document = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchive"), false))
      .order("desc")
      .collect();
    return document;
  },
});
export const remove = mutation({
  args: { documentId: v.id("documents") },

  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("not authenticated ");
    }
    const userId = identity.subject;
    const existDocument = await ctx.db.get(args.documentId);
    if (!existDocument) {
      throw new Error("Not Found ");
    }
    if (existDocument.userId !== userId) {
      throw new Error("Not authenticated ");
    }
    const document = ctx.db.delete(args.documentId);
    return document;
  },
});
export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, arg) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("not authenticated ");
    }
    const userId = identity.subject;
    const document = ctx.db.insert("documents", {
      title: arg.title,
      parentDocument: arg.parentDocument,
      userId,
      isArchive: false,
      isPublished: false,
    });
    return document;
  },
});
