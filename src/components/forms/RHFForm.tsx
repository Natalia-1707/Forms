import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addSubmission } from "../../store/formSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { toBase64 } from "../../utils/toBase64";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormSchema, type FormSchema } from "../../validation/validation";

type Props = {
  onSuccess: () => void;
};

export default function RHFForm({ onSuccess }: Props) {
  const countries = useSelector((state: RootState) => state.countries.countries);
  const schema = createFormSchema(countries);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    } = useForm<FormSchema>({
    resolver:
        zodResolver(schema),
    mode: "onChange",
    });

  const handleImageChange = async (
    e: React.ChangeEvent<HTMLInputElement> ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!["image/png", "image/jpeg"].includes(file.type)) {
        alert("Only PNG and JPEG");
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        alert("Max size 5MB");
        return;
    }

    const base64 = await toBase64(file);

    setValue("image", base64, {
      shouldValidate: true,
    });
  };

  const dispatch = useDispatch();

  const onSubmit = (data: FormSchema) => {
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
        <input id="name" {...register("name")} />
         <p className="error-message">{errors.name?.message}</p>
      </div>

      <div className="input-div">
        <label htmlFor="age">Age</label>
        <input id="age" type="number" {...register("age", { valueAsNumber: true })}
        />
        <p className="error-message">{errors.age?.message}</p>
      </div>

      <div className="input-div">
        <label htmlFor="gender">Gender</label>
        <select id="gender" {...register("gender")}>
          <option value="">Choose</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <p className="error-message">{errors.gender?.message}</p>
      </div>

      <div className="input-div">
        <label htmlFor="email">Email</label>
        <input id="email" {...register("email")} />
        <p className="error-message">{errors.email?.message}</p>
      </div>
      
      <div className="input-div">
        <label htmlFor="country">Country</label>
        <input id="country" list="countries"{...register("country")}/>
          <datalist id="countries">
            {countries.map((country) => (
              <option key={country} value={country} />
            ))}
          </datalist>
          <p className="error-message">{errors.country?.message}</p>
      </div>

      <div className="input-div">
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register("password")} />
        <p className="error-message">{errors.password?.message}</p>
      </div>

      <div className="input-div">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input id="confirmPassword" type="password"{...register("confirmPassword")}/>
        <p className="error-message">{errors.confirmPassword?.message}</p>
      </div>

      <div className="input-div">
        <label htmlFor="image">Upload image</label>
        <input
          id="image"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
        <input type="hidden" {...register("image")} />
        <p className="error-message">{errors.image?.message}</p>
      </div>

      <div>
        <label htmlFor="terms">
          <input id="terms" type="checkbox" {...register("terms")} />
          I accept Terms & Conditions
        </label>
        <p className="error-message">{errors.terms?.message}</p>
      </div>

      <button type="submit" disabled={!isValid}>Submit</button>
    </form>
  );
}