interface Props {
  rating: number;
}

export default function RatingStar({ rating }: Props) {
  return (
    <>
      <Star order={1} rate={rating} />
      <Star order={2} rate={rating} />
      <Star order={3} rate={rating} />
      <Star order={4} rate={rating} />
      <Star order={5} rate={rating} />
    </>
  );
}

function Star({ order, rate }: { order: number; rate: number }) {
  const diff = rate - order;
  let src = '';

  if (diff >= 0) {
    src = star.full;
  } else if (Math.abs(diff) === 0.5) {
    src = star.half;
  } else {
    src = star.empty;
  }

  return <img alt="rating" src={src} width="14" height="14" />;
}

const star = {
  full: '/assets/full_star.png',
  empty: '/assets/empty_star.png',
  half: '/assets/half_star.png',
};
