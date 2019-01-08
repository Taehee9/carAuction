
const reducer = (state = { mem: [], listingId: 0 }, action) => {
    switch (action.type) {
        case 'LOADED_MEM':
            return {
                ...state,
                mem: action.mem
            }
        case 'LISTING_ID':
            return {
                ...state,
                listingId: action.listingId + 1
            }
    }
    return state;
};

export default reducer;
