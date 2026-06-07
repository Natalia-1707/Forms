import { useDispatch } from "react-redux";
import { addSubmission } from "../../store/formSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { toBase64 } from "../../utils/toBase64";
import { useState } from "react";
import { createFormSchema } from "../../validation/validation";

type Props = {
  onSuccess: () => void;
};

export default function UncontrolledForm ({ onSuccess }: Props) {
    const [errors, setErrors] = useState< Record<string, string>>({});

    const dispatch = useDispatch();

    const countries = useSelector((state: RootState) => state.countries.countries);
    const schema = createFormSchema(countries);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(
        e.currentTarget
      );

      const file = formData.get("image") as File;

      let imageBase64 = "";

      const acceptedTypes = [
        "image/png",
        "image/jpeg",
      ];

      if ( file instanceof File && file.size > 0) {
        if (!acceptedTypes.includes(file.type)) {
          setErrors({
            image:
              "Only PNG and JPEG",
            });
          return;
        }

        if ( file.size > 5 * 1024 * 1024) {
          setErrors({
            image: "Max size 5MB",
            });
          return;
        }

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
        image: imageBase64,
        terms: formData.get("terms") === "on",
    };

    const result = schema.safeParse(data);

    if (!result.success) {
        const fieldErrors: Record<
        string,
        string
        > = {};

        result.error.issues.forEach(
        (issue) => {
            const field =
            issue.path[0];

            if (
            typeof field ===
            "string"
            ) {
            fieldErrors[field] =
                issue.message;
            }
        }
      );

      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    dispatch(
        addSubmission({
        id: crypto.randomUUID(),
        type: "uncontrolled",
        data: result.data,
        })
    );

    onSuccess();
    e.currentTarget.reset();
    };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-div">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />
        <p className="error-message">{errors.name}</p>
      </div>

      <div className="input-div">
        <label htmlFor="age">Age</label>
        <input id="age" name="age"  type="number"/>
        <p className="error-message">{errors.age}</p>
      </div>

      <div className="input-div">
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender">
          <option value="">Choose</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <p className="error-message">{errors.gender}</p>
      </div>

      <div className="input-div">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
        <p className="error-message">{errors.email}</p>
      </div>

      <div className="input-div">
        <label htmlFor="country">Country</label>
        <input id="country" name="country" list="countries"/>
        <datalist id="countries">
            {countries.map((country) => (
            <option key={country} value={country} />
            ))}
        </datalist>
        <p className="error-message">{errors.country}</p>
      </div>
      
      <div className="input-div">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password"/>
        <p className="error-message">{errors.password}</p>
      </div>

      <div className="input-div">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input id="confirmPassword" name="confirmPassword" type="password"/>
        <p className="error-message">{errors.confirmPassword}</p>
      </div>
      
      <div>
        <label htmlFor="image">Upload image</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="image"
          name="image"
        />
        <p className="error-message">{errors.image}</p>
      </div>

      <div>
        <label htmlFor="terms">
          <input type="checkbox" id="terms" name="terms" />
          I accept Terms & Conditions
        </label>
        <p className="error-message">{errors.terms}</p>
      </div>

      <button type="submit">Submit</button>
    </form>
   );
}