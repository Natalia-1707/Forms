export default function UncontrolledForm () {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      age: formData.get("age"),
      email: formData.get("email"),
    };

    console.log("Uncontrolled submit:", data);
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
        <input id="gender" name="gender" />
      </div>

      <div className="input-div">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
      </div>

      <div className="input-div">
        <label htmlFor="country">Country</label>
        <input id="country" name="country" />
      </div>
      
      <div className="input-div">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" />
      </div>
      
      <div>
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