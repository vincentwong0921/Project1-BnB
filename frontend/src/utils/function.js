export const formatDate = (date) => {
  const dateToChange = new Date(date);
  const options = { month: "long", year: "numeric" };
  return dateToChange.toLocaleDateString(undefined, options);
};

export const formatRating = rating => {
  return rating ? rating.toFixed(1) : "";
};


export const formatPrice = price => {
  return price ? price.toFixed(2) : ""
};
