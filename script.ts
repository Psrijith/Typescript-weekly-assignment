
const form = document.getElementById("contactForm") as HTMLFormElement;

if (form) {
  form.addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const name = (form.elements.namedItem("name") as HTMLInputElement).value;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  const number = (form.elements.namedItem("number") as HTMLInputElement).value;
  const subject = (form.elements.namedItem("subject") as HTMLInputElement)
    .value;
  const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
    .value;

  const formData ={
    name,email,number,subject,message
  };

  const regex = /^\d{10}$/;
  if (!regex.test(number)) {
    alert("Invalid phone number!");
  }  

  else{
    try{
      const response = await fetch("https://67137e836c5f5ced6626986c.mockapi.io/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      form.reset();
      alert("Form submitted successfully \n"+ JSON.stringify(responseData));
    }catch (error){
      alert("Error in  submitting form");
    }
  }
}
