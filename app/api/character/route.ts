import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import type { Character } from "@prisma/client";

export const POST = async (request: Request) => {
  const body: Character = await request.json();
  const character = await prisma.character.create({
    data: {
      name: body.name,
      path_id: body.path_id,
      element_id: body.element_id,
      origin_id: body.origin_id,
      deletedAt: "",
    },
  });
  return NextResponse.json(character);
};
