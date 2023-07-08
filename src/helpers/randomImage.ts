import starwars from "~/assets/images/starwars.svg";
import stormtrooper from "~/assets/images/stormtrooper.svg";

export const randomImage = () => {
  const images = [starwars, stormtrooper]
  return images[Math.floor(Math.random() * images.length)]
}
