import RoomClient from "./RoomClient";


interface RoomPageProps {
  params: { id: string };
  searchParams: { name?: string };
}

export default function RoomPage({ params, searchParams }: RoomPageProps) {
  return <RoomClient params={params} searchParams={searchParams} />;
}
