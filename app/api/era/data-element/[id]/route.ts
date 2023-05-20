import { NextResponse } from "next/server";
import { prisma } from "@/prisma/db";
import type { DataElement } from "@prisma/client";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const res = await prisma.dataElement.findMany();
  return NextResponse.json(res, { status: 200 });
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: DataElement = await request.json();
  const res = await prisma.dataElement.create({
    data: {
      name: body.name,
      desc: body.desc,
      deletedAt: "",
    },
  });
  return NextResponse.json(res, { status: 200 });
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: DataElement = await request.json();
  const res = await prisma.dataElement.update({
    where: {
      id: Number(params.id),
    },
    data: {
      name: body.name,
      desc: body.desc,
    },
  });
  return NextResponse.json(res, { status: 200 });
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const res = await prisma.dataElement.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(res, { status: 200 });
};
