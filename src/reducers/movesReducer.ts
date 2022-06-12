/* eslint-disable default-param-last */
/* eslint-disable no-param-reassign */
import produce from 'immer';
import { MovesAction, MovesActionTypes } from '../actionTypes';
import { GetMoveResponse, PokemonMove } from '../types';

interface State {
  byId: {
    [key: number]: PokemonMove;
  };
  allIds: number[];
  loading: boolean;
}

const initialState: State = {
  byId: {},
  allIds: [],
  loading: false,
};

const addNewMoves = (state: State, newMoves: GetMoveResponse[]) => {
  newMoves.forEach((move) => {
    const name = move.name.replaceAll('-', ' ');
    const description = move.effect_entries[0]?.short_effect.replaceAll(
      '$effect_chance%',
      `${move.effect_chance}%`,
    );

    state.byId[move.id] = {
      id: move.id,
      name,
      description,
      damageCategory: move.damage_class.name,
      type: move.type.name,
    };
  });
  state.allIds = Object.keys(state.byId).map((key) => Number(key));
};

export const movesReducer = produce(
  (state = initialState, action: MovesAction): State => {
    switch (action.type) {
      case MovesActionTypes.GET_MOVES_REQUESTED:
        state.loading = true;
        return state;

      case MovesActionTypes.GET_MOVES_FAILED:
        state.loading = false;
        return state;

      case MovesActionTypes.GET_MOVES_SUCCEEDED:
        addNewMoves(state, action.payload.newMoves);
        state.loading = false;
        return state;

      default:
        return state;
    }
  },
  initialState,
);
