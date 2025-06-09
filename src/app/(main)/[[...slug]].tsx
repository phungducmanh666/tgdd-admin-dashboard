// pages/[[...slug]].tsx
import { useRouter } from "next/router";

export default function CatchAllPage() {
  const router = useRouter();
  const slug = router.query.slug;

  return (
    <div>
      <h1>Catch-All Route</h1>
      <p>URL hiện tại: /{Array.isArray(slug) ? slug.join("/") : ""}</p>
    </div>
  );
}
