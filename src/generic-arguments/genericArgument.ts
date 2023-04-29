type LoginPayload = {
  userName: string;
  password: string;
};

type LoginResult = {
  status: "success" | "fail";
  data: {
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

type Requests =
  | { type: "LOG_IN"; payload: LoginPayload }
  | { type: "SIGN_OUT" }
  | { type: "ADD_NOTE"; payload: AddNotePayload }
  | { type: "DELETE_NOTE"; payload: DeleteNotePayload };

type Responses =
  | { type: "LOG_IN"; result: LoginResult }
  | { type: "SIGN_OUT"; result: SignOutResult }
  | { type: "ADD_NOTE"; result: AddNoteResult }
  | { type: "DELETE_NOTE"; result: DeleteNoteResult };

const sendRequestWithGenericArgument = <T extends Requests["type"]>(
  ...args: Extract<Requests, { type: T }> extends { payload: infer TPayload } // ? if payload exist & infer TPayload from payload return [type: T, payload: TPayload]
    ? [type: T, payload: TPayload]
    : [type: T] // ? else return [type: T]
): Responses => {
  const [type, payload] = args;
  switch (type) {
    case "LOG_IN":
      console.log({ type, payload });
      return {
        type,
        result: {
          status: "success",
          data: {
            token: "1qweqwe125230",
          },
        },
      };
    case "SIGN_OUT":
      console.log({ type, payload });
      return {
        type,
        result: {
          status: "success",
        },
      };
    case "ADD_NOTE":
      console.log({ type, payload });
      return {
        type,
        result: {
          status: "success",
          data: {
            noteId: "123",
          },
        },
      };
    case "DELETE_NOTE":
      console.log({ type, payload });
      return {
        type,
        result: {
          status: "success",
        },
      };

    default:
      throw new Error("Your request is not valid.");
  }
};

const loginResult = sendRequestWithGenericArgument("LOG_IN", {
  userName: "test",
  password: "test",
});
console.log({ loginResult });

const signOutResult = sendRequestWithGenericArgument("SIGN_OUT");
console.log({ signOutResult });

const addNoteResult = sendRequestWithGenericArgument("ADD_NOTE", {
  note: "Take out the trash",
});
console.log({ addNoteResult });

const deleteNoteResult = sendRequestWithGenericArgument("DELETE_NOTE", {
  noteId: "note-123",
});
console.log({ deleteNoteResult });