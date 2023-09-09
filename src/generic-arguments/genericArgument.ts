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
  ...args: Extract<Requests, { service: T }> extends {
    requestBody: infer TPayload;
  }
    ? [service: T, requestBody: TPayload]
    : [service: T] // ? else return [type: T]
): Promise<Responses> => {
  const [service, requestBody] = args;

  switch (service) {
    case types.LOG_IN:
      // INFO (serif) : fetch data here and return response YOUR_LOGIC_HERE
      const res = await fetch("https://example.com/", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      const data = await res.json();

      if (data.status === "fail") {
        // throw new Error("Login failed");

        return {
          service,
          responseBody: {
            status: "fail",
            message: "Login failed",
          },
        };
      }

      return {
        service,
        responseBody: {
          status: data.status,
          message: data?.message ?? "",
          data: {
            token: data?.data?.token ?? "",
          },
        },
      };
    case types.SIGN_OUT:
      console.log({ service, requestBody });
      return {
        service,
        responseBody: {
          status: "success",
        },
      };
    case types.ADD_NOTE:
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
    case types.DELETE_NOTE:
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

(async () => {
  const loginResult = generalServiceActions("ADD_NOTE", {
    note: "125125125",
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
})();

type OnlyLoginRequest = Extract<Requests, { service: "LOG_IN" }>;

type OnlySignOutRequest = Extract<Requests, { service: "SIGN_OUT" }>;

type OnlyAddNoteRequest = Extract<Requests, { service: "ADD_NOTE" }>;

type OnlyDeleteNoteRequest = Extract<Requests, { service: "DELETE_NOTE" }>;

type OnlyLoginResponse = Extract<
  Responses,
  { service: "LOG_IN" }
>["responseBody"];

type OnlySignOutResponse = Extract<
  Responses,
  { service: "SIGN_OUT" }
>["responseBody"];

type OnlyAddNoteResponse = Extract<
  Responses,
  { service: "ADD_NOTE" }
>["responseBody"];

type OnlyLoginResponse2 = Extract<
  Responses,
  { service: "LOG_IN" }
>["responseBody"];
