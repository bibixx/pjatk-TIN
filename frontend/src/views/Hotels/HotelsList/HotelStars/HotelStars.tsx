interface Props {
  numberOfStars: number;
}

export const HotelStars = ({ numberOfStars }: Props) => {
  return (
    <div className={`hotel-stars hotel-stars--stars-${numberOfStars}`}>
      <span className="material-icons hotel-stars__icon">star</span>
      <span className="material-icons hotel-stars__icon">star</span>
      <span className="material-icons hotel-stars__icon">star</span>
      <span className="material-icons hotel-stars__icon">star</span>
      <span className="material-icons hotel-stars__icon">star</span>
    </div>
  );
};
