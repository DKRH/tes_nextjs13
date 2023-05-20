import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import type { Character } from "@prisma/client";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: Character = await request.json();
  const character = await prisma.character.update({
    where: {
      id: Number(params.id),
    },
    data: {
      name: body.name,
      path_id: body.path_id,
      element_id: body.element_id,
      origin_id: body.origin_id,
    },
  });
  return NextResponse.json(character);
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const character = await prisma.character.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(character, { status: 200 });
};
