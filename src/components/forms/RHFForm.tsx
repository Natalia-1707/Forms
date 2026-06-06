import { useForm } from "react-hook-form";
import type { FormValues } from '../../types/types'
import { useDispatch } from "react-redux";
import { addSubmission } from "../../store/formSlice";

type Props = {
  onSuccess: () => void;
};

export default function RHFForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
  } = useForm<FormValues>({
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const onSubmit = (data: FormValues) => {
   dispatch (
    addSubmission({
      id: crypto.randomUUID(),
      type: "rhf",
      data,
      })
   );
   onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-div">
        <label>Name</label>
        <input {...register("name", { required: true })} />
      </div>

      <div className="input-div">
        <label>Age</label>
        <input type="number" {...register("age", { required: true })} />
      </div>

      <div className="input-div">
        <label>Gender</label>
        <input {...register("gender")} />
      </div>

      <div className="input-div">
        <label>Email</label>
        <input {...register("email")} />
      </div>

      <div className="input-div">
        <label>Country</label>
        <input {...register("country")} />
      </div>

      <div className="input-div">
        <label>Password</label>
        <input type="password" {...register("password")} />
      </div>

      <div>
        <label>Upload image</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          /* {...register("image")} */
        />
      </div>

      <div>
        <label>
          <input type="checkbox" {...register("terms")} />
          I accept Terms & Conditions
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}