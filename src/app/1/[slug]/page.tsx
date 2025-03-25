import { decodeData } from "@/lib/utils";
import { BACKGROUND_OPTIONS } from "@/components/Background/BgSnippets";
import DisplayScreen from "@/components/screen/DisplayScreen";
import { supabaseServer } from "@/lib/supabase/supabaseServer";
import DataLoading from "../loading";
import { notFound } from "next/navigation";
type Props = {
  params: {
    slug: string;
  };
};
export async function generateMetadata({ params }: Props) {
  const path = await supabaseServer()
    .from("links")
    .select("*")
    .eq("path", params.slug);
  if (path.data?.length === 0) return notFound();

  const data = decodeData(path?.data?.[0].link);
  if (!data) {
    return {};
  }

  return {
    title: `${data.n}'s`,
    description: `Find all of ${data.n}'s links in one place.`,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: process.env.NEXT_PUBLIC_VERCEL_URL,
      title: `${data.n}'s - ShortURL`,
      description: `Find all of ${data.n}'s links in one place.`,
      images: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/og?data=${encodeURI(
        data.n
      )}`,
      siteName: `${data.n}'s - ShortURL`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.n} - ShortURL`,
      description: `Find all of ${data.n}'s links in one place.`,
      images: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/og?data=${encodeURI(
        data.n
      )}`,
      creator: "@Taquiimam14",
    },
  };
}

const linkLandingPage: React.FC<Props> = async ({ params }) => {
  const path = await supabaseServer()
    .from("links")
    .select("*")
    .eq("path", params.slug);
  if (path.data?.length === 0) return notFound();

  const data = decodeData(path?.data?.[0].link);
  const selectedBgOption = data
    ? BACKGROUND_OPTIONS.find((option) => option.code === data.bg)
    : null;

  const selectedBgComponent = selectedBgOption
    ? selectedBgOption.component
    : null;

  return (
    <>
      <div className="fixed left-0 top-0 -z-10 h-full w-full">
        {selectedBgComponent}
      </div>
      <div className="p-2 pt-10 hide_scrollbar">
        {data ? <DisplayScreen myData={data} /> : <DataLoading />}
      </div>
    </>
  );
};

export default linkLandingPage;
