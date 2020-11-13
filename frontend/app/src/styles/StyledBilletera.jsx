import styled from 'styled-components';

const StyledBilletera = styled.div`
  
  .card-form{
    display: flex;
    margin: 7em auto;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    width: 60em;

    form {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      padding: 2em;
      width: 100%;
    }

    input {
      background: #f2f2f2;
      margin-left: 3em;
      border: none;
      width: 25em;
      padding: 1em;
    }

    button{
        margin: 1em 3em ;
        padding: 7px 25px;
        font-size: 16px;
    }


    
  }

h1 {
    padding-top : 3em;
    text-align: center;
    height: 8em;
  }

  button {
        
        background-color: rgb(245,138,62);
        border: none;
        color: black;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        
    }  
  button:hover{
    background-color:rgb(251,164,74);
  }


.card-billetera{
  margin: 5em ;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  

}

.datos-billetera {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly
}

section {
  padding : 2em;

  p {
    margin: 3em 0;
  }
}
.acciones{
  display: flex;
  flex-direction: column;

  button{
    margin: 1em 0;
    padding: 6px 15px;
    font-size: 14px;
  }

  input{
      background: #f2f2f2;
      border: none;
      width: 8em;
      padding: 1em;
  }

}
`
export default StyledBilletera