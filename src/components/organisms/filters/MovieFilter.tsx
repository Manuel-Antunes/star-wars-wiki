import { useFormContext } from "react-hook-form";
import TextField from "~/components/atoms/forms/TextField";
import WithLabel from "~/components/atoms/forms/WithLabel";

const MovieFilter = () => {
  const { register } = useFormContext();

  return (
    <>
      <WithLabel className="col-span-12" text="Nome">
        <TextField {...register("search")} />
      </WithLabel>
    </>
  );
};

export default MovieFilter;
