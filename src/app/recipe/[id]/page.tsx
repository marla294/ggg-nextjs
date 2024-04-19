"use client";

export default function Page({ params }: { params: { id: string } }) {
  return <div>Recipe page id: {params?.id}</div>;
}
