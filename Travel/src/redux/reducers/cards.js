const initialState = {
    cards: [
        { id: 1, title: 'Rome', continent: "Europe", typeExp: "History cultural", price: 500, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet', imgSrc: '/src/assets/img/img-card.png' },
        { id: 2, title: 'Rome', continent: "Europe", typeExp: "History cultural", price: 500, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet', imgSrc: '/src/assets/img/img-card.png' },
        { id: 3, title: 'Rome', continent: "Europe", typeExp: "History cultural", price: 500, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet', imgSrc: '/src/assets/img/img-card.png' },
        { id: 4, title: 'Rome', continent: "Europe", typeExp: "History cultural", price: 500, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet', imgSrc: '/src/assets/img/img-card.png' },
        { id: 5, title: 'Rome', continent: "Europe", typeExp: "History cultural", price: 500, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet', imgSrc: '/src/assets/img/img-card.png' },
        { id: 6, title: 'Rome', continent: "Europe", typeExp: "History cultural", price: 500, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet', imgSrc: '/src/assets/img/img-card.png' },
    ]
}

const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CARDS':
            return {
                ...state,
                cards: state.cards.cards.concat(action.payload),
            }
        default:
            return state
    }
}

export default cardsReducer