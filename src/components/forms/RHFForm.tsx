import { useForm } from "react-hook-form";
import type { FormValues } from '../../types/types'
import { useDispatch } from "react-redux";
import { addSubmission } from "../../store/formSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { toBase64 } from "../../utils/toBase64";

type Props = {
  onSuccess: () => void;
};

export default function RHFForm({ onSuccess }: Props) {
  const { register, handleSubmit, setValue } = useForm<FormValues>({
    mode: "onChange",
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const base64 = await toBase64(file);

    setValue("image", base64);
  };

  const dispatch = useDispatch();

  const countries = useSelector((state: RootState) => state.countries.countries);

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
        <label htmlFor="name">Name</label>
        <input {...register("name", { required: true })} />
      </div>

      <div className="input-div">
        <label htmlFor="age">Age</label>
        <input type="number" {...register("age", { required: true })} />
      </div>

      <div className="input-div">
        <label htmlFor="gender">Gender</label>
        <select id="gender" {...register("gender")}>
          <option value="">Choose</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>

      <div className="input-div">
        <label htmlFor="email">Email</label>
        <input {...register("email")} />
      </div>
      
      <div className="input-div">
        <label htmlFor="country">Country</label>
        <input id="country" list="countries"{...register("country")}/>
          <datalist id="countries">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
      </div>

      <div className="input-div">
        <label htmlFor="password">Password</label>
        <input type="password" {...register("password")} />
      </div>

      <div className="input-div">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input id="confirmPassword" type="password"{...register("confirmPassword")}/>
      </div>

      <div>
        <label htmlFor="image">Upload image</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
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