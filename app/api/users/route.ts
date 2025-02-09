import { NextResponse } from "next/server"
import { mockUsers } from "@/utils/mockData"

export async function GET() {
  return NextResponse.json(mockUsers)
}

