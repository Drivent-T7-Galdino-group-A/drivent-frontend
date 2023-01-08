import Cards from 'react-credit-cards-2';
import InputMask from 'react-input-mask';
import styled from 'styled-components';
import 'react-credit-cards-2/es/styles-compiled.css';

export default function CreditCard({ state, setState }) {
  function handleInputChange(event) {
    const { name, value } = event.target;

    setState(data =>
      ({
        ...data,
        [name]: value
      })
    );
  }

  function handleInputFocus(event) {
    setState(data =>
      ({
        ...data,
        focus: event.target.name
      })
    );
  }

  function handleCardNumberChange({ issuer, maxLength }, isValid) {
    setState(data => 
      ({
        ...data,
        issuer
      })
    );
  }

  return (
    <Wrapper id='CreditCard'>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus}
        callback={handleCardNumberChange}
      />
      <form autoComplete="off">
        <InputMask
          type="text"
          name="number"
          placeholder="Card Number"
          minLength="14"
          maxLength="22"
          mask="9999 9999 9999 9999999"
          maskChar=""
          value={state.number}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <InputMask
          type="name"
          name="name"
          placeholder="Name"
          value={state.name}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <div>
          <InputMask
            type="expiry"
            name="expiry"
            placeholder="Valid Thru"
            minLength="5"
            maxLength="5"
            mask="99/99"
            maskChar=""
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <InputMask
            type="cvc"
            name="cvc"
            placeholder="CVC"
            minLength="3"
            maxLength="4"
            mask="9999"
            maskChar=""
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  > div:first-child {
    width: 290px !important;
    height: 183px !important;
  }

  input {
    width: 320px;
    font-size: 23px;
    padding: 10px;
    border-width: 2px;
    border-radius: 5px;
    border-color: rgba(0, 0, 0, 0.2);
    outline: none;
    
    &:focus {
      border-color: rgba(0, 0, 0, 0.5);
    }
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    > div {
      > input:first-child {
        width: 200px;
      };

      > input:last-child {
        width: 100px;
      }

      display: flex;
      justify-content: space-between;
    }
  }
`;
