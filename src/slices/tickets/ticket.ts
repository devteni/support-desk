import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import API from "../../lib/API";
import ProcessError from "../../lib/error";
import ticketService from "./ticket.service";


type State = {
  tickets: any[],
  isLoading: boolean,
  currentPage: number,
  itemsPerPage: number,
  total: number,
  isSearching: false,
  error: string
}

const initialState: State = {
    tickets: [],
    isLoading: false,
    currentPage: 1,
    itemsPerPage: 5,
    total: 0,
    isSearching: false,
    error: ""
};


export const createTicket = createAsyncThunk("ticket/createTicket", async (payload: Record<string, string>, { rejectWithValue }) => {
    try {
      const { message, data } = await ticketService.createTicket(payload);

      toast.success(message);

      console.log(data)
      return data;

    } catch (error) {
      console.log(error)
      const err = ProcessError(error);
      return rejectWithValue(err);
    }
});

export const getTickets = createAsyncThunk("ticket/getTickets", async({}, { getState, rejectWithValue}) => {
    const tickets = getState().ticket;
    try {
        const data = await ticketService.fetchTickets({ page: tickets.currentPage, size: tickets.itemsPerPage });

        return data;
    } catch (error) {
      console.log(error)
      const err = ProcessError(error);
      return rejectWithValue(err);
    }
})


export const authSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
      setTickets: (state, action) => {
        state.tickets = action.payload;
        state.isLoading = false;
      },
      setTotalTickets: (state, action) => {
        state.total = action.payload;
      },
      setItemsPerPage: (state, action) => {
        state.itemsPerPage = action.payload
      },
      setCurrentPage: (state, action) => {
        state.currentPage = action.payload
      },
      setIsSearching: (state, action) => {
        state.isSearching = action.payload
      },
      setIsLoading: (state, action) => {
        state.isLoading = action.payload
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(createTicket.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(createTicket.fulfilled, (state, action) => {
          state.isLoading = false;
          state.error = "";
          state.tickets = [action.payload, ...state.tickets]
        })
        .addCase(createTicket.rejected, (state, action) => {
          state.isLoading = false;
          state.error = `${action.payload}`;
        })
        .addCase(getTickets.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getTickets.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tickets = action.payload;
            state.error = "";
          })
          .addCase(getTickets.rejected, (state, action) => {
            state.isLoading = false;
            state.error = `${action.payload}`;
          })
    },
});

const { actions, reducer } = authSlice;
export const { setCurrentPage, setIsLoading, setIsSearching, setItemsPerPage, setTickets, setTotalTickets } = actions;

export default reducer;