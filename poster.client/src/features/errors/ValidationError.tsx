import { Message } from "semantic-ui-react";

interface Props {
  errors: any;
}

export default function ValidationError({ errors }: Props) {
  const { response } = errors;

  
  const findFirstElement = (obj: any): any => {
    for (var key in obj) {
      if (Array.isArray(obj[key])) {
        return obj[key][0];
      }
      if (typeof obj[key] === "object") {
        var result = findFirstElement(obj[key]);
        if (result) {
          return result;
        }
      }
    }
    return null;
  };
  debugger;

  let errorMessages = response.data;
  if (response.data.errors) {
    errorMessages = findFirstElement(response.data.errors) ?? "Nieznany błąd podczas rejestracji.";
  }

  return (
    <Message error>
      <Message.Item>{errorMessages}</Message.Item>
    </Message>
  );
}
