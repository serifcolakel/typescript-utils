type LoginPayload = {
  userName: string;
  password: string;
};

type LoginResult = {
  status: "success" | "fail";
  message?: string;
  data?: {
    token: string;
  };
};

type SignOutResult = {
  status: "success" | "fail";
};

type AddNotePayload = {
  note: string;
};

type AddNoteResult = {
  status: "success" | "fail";
  data: {
    noteId: string;
  };
};

type DeleteNotePayload = {
  noteId: string;
};

type DeleteNoteResult = {
  status: "success" | "fail";
};

const types = {
  LOG_IN: "LOG_IN",
  SIGN_OUT: "SIGN_OUT",
  ADD_NOTE: "ADD_NOTE",
  DELETE_NOTE: "DELETE_NOTE",
} as const;

type Requests =
  | { service: typeof types.LOG_IN; requestBody: LoginPayload }
  | { service: typeof types.SIGN_OUT }
  | { service: typeof types.ADD_NOTE; requestBody: AddNotePayload }
  | { service: typeof types.DELETE_NOTE; requestBody: DeleteNotePayload };

type Responses =
  | { service: typeof types.LOG_IN; responseBody: LoginResult }
  | { service: typeof types.SIGN_OUT; responseBody: SignOutResult }
  | { service: typeof types.ADD_NOTE; responseBody: AddNoteResult }
  | { service: typeof types.DELETE_NOTE; responseBody: DeleteNoteResult };

const generalServiceActions = async <T extends Requests["service"]>(
  ...args: Extract<Requests, { service: T }> extends { requestBody: infer TPayload }
    ? [service: T, requestBody: TPayload]
    : [service: T] // ? else return [type: T]
): Promise<Responses> => {
  const [service, requestBody] = args;
  
  switch (service) {
    case "LOG_IN":
      const res = fetch("https://example.com/login", {
        method: "POST",
        body: JSON.stringify(requestBody),
      }).then((res) => res.json()).then((res:LoginResult) => res);
      
      if ((await res).status === "fail") {
        return {
          service,
          responseBody: {
            status: 'fail',
            message: 'Login failed'
          },
        }
        // throw new Error("Login failed");
      }

      return {
        service,
        responseBody: {
          status: (await res).status,
          message: (await res)?.message ?? '',
          data: {
            token: (await res)?.data?.token ?? '',
          },
        },
      };
    case "SIGN_OUT":
      console.log({ service, requestBody });
      return {
        service,
        responseBody: {
          status: "success",
        },
      };
    case "ADD_NOTE":
      console.log({ service, requestBody });
      // ? fetch data here and return response
      return {
        service,
        responseBody: {
          status: "success", // ? check if response is success or fail
          data: {
            noteId: "123", // ? return noteId
          },
        },
      };
    case "DELETE_NOTE":
      console.log({ service, requestBody });
      // ? fetch data here and return response
      return {
        service,
        responseBody: {
          status: "success",
        },
      };

    default:
      throw new Error("Your request is not valid.");
  }
};

const loginResult = generalServiceActions("ADD_NOTE", {
  note: '125125125'
});
console.log({ loginResult });

const signOutResult = generalServiceActions("SIGN_OUT");
console.log({ signOutResult });

const addNoteResult = generalServiceActions("ADD_NOTE", {
  note: "Take out the trash",
});
console.log({ addNoteResult });

const deleteNoteResult = generalServiceActions("DELETE_NOTE", {
  noteId: "note-123",
});
console.log({ deleteNoteResult });


type OnlyLoginResponse = Extract<Responses, { service: "LOG_IN" }>['responseBody']

const dims = {
  keyValue: '0',
  object: '1',
  Array: '2',
}  as const;

// dims type must be '0' | '1' | '2'
type Dims = keyof typeof dims;
type Values = typeof dims[Dims];

type DimTypes = {
  keyValue: {
    key: string,
    value: string
    dim: Values
  },
}

const dimTypes: DimTypes = {
  keyValue: {
    dim: '1',
    key: '1',
    value: '1'
  }
}