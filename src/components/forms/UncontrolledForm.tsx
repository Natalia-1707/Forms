import { useDispatch } from "react-redux";
import { addSubmission } from "../../store/formSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { toBase64 } from "../../utils/toBase64";

type Props = {
  onSuccess: () => void;
};

export default function UncontrolledForm ({ onSuccess }: Props) {
    const dispatch = useDispatch();

    const countries = useSelector((state: RootState) => state.countries.countries);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const file = formData.get("image") as File;

        let imageBase64 = "";

        if (file instanceof File && file.size > 0) {
            imageBase64 = await toBase64(file);
        }

        const data = {
            name: String(formData.get("name")),
            age: Number(formData.get("age")),
            gender: String(formData.get("gender")),
            email: String(formData.get("email")),
            country: String(formData.get("country")),
            password: String(formData.get("password")),
            confirmPassword: String(formData.get("confirmPassword")),
            image: imageBase64 || null,
            terms: formData.get("terms") === "on",
        };

        dispatch(
            addSubmission({
            id: crypto.randomUUID(),
            type: "uncontrolled",
            data,
            })
        );

        onSuccess();
        };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-div">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />
      </div>

      <div className="input-div">
        <label htmlFor="age">Age</label>
        <input id="age" name="age" />
      </div>

      <div className="input-div">
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender">
          <option value="">Choose</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
      </div>

      <div className="input-div">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
      </div>

      <div className="input-div">
        <label htmlFor="country">Country</label>
        <input id="country" name="country" list="countries"/>
        <datalist id="countries">
            {countries.map((country) => (
            <option key={country} value={country} />
            ))}
        </datalist>
      </div>
      
      <div className="input-div">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" />
      </div>

      <div className="input-div">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
        />
      </div>
      
      <div>
        <label htmlFor="image">Upload image</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="image"
          name="image"
        />
      </div>

      <div>
        <label htmlFor="terms">
          <input type="checkbox" id="terms" name="terms" />
          I accept Terms & Conditions
        </label>
      </div>

      <button type="submit">Submit</button>
    </form>
   );
}