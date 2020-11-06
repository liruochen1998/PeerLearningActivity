import React from 'react';
import { fireEvent, getByLabelText, getByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RadioButtonPanel, { RadioButton } from './RadioButtonPanel.js';
import { renderData, getStyledHeadings } from '../../utils/data.js';

const testHeadings = ['test1', 'test2','test3'];

let onChange = jest.fn();
const customRender = (ui, options) =>{
  render(<RadioButton headings={testHeadings} checkedButton={testHeadings[0]} handleChange={onChange} />, { wrapper: RadioButtonPanel})
}

describe('<RadioButtonPanel /> component test', () => {

//   test('it should mount', () => {
//     let changeValue = jest.fn();
//     console.log(typeof testHeadings);

//     render(<RadioButton headings={['test1', 'test2','test3']} changeDataType={changeValue} checkedButton={'test1'}/>);

//     render(<RadioButtonPanel headings={['test1', 'test2','test3']} changeDataType={changeValue} />);
//     const radioButtonPanel = screen.getByTestId('RadioButtonPanel');
//     expect(radioButtonPanel).toBeInTheDocument();
//     const radioButton = screen.getByTestId('RadioButton');
//     expect(radioButton).toBeInTheDocument();
    
//   });

  test("radio", async () => {
    // const { getByLabelText } = render(

    //     <RadioButtonPanel headings={['test1', 'test2','test3']}/>
    // )

    // const radioButtonPanel = screen.getByTestId('RadioButtonPanel');
    //     console.log(radioButtonPanel);
  
    // const firstButton = getByLabelText('test1');
    // fireEvent.change(firstButton, { target: { value: "test2" } });
    // expect(firstButton.value).toBe('test2');
    // expect(firstButton.checked).toBe(false);



    // const { getByLabelText } = customRender();

    let onChange = jest.fn();

    let element = await RadioButton(['test1', 'test2','test3'], 'test1', onChange);
    render(element);
    console.log(document.getElementsByName('button').length);
    expect(document.getElementsByClassName('checkbox').length === 3);
    console.log(document.getElementsByClassName('checkbox'));
    expect(document.getElementsByClassName('checkbox'));
    




    // const element = render(<RadioButton headings={['test1', 'test2','test3']} 
    // checkedButton={testHeadings[0]} handleChange={onChange} />);

    // const firstButton = getByLabelText('test1');
    // expect(firstButton).toBeInTheDocument();

  });
  

  /*
  test('click submit fires callback', () => {
    const onClick = jest.fn();
    render(<LogTable onClick={onClick} testEnv="true"/>);
    fireEvent.click(screen.getByText(/submit/i));
    expect(onClick).toHaveBeenCalled();
  });
//   */

//   test('text box should change before submit', () => {
     
//     renderData().then()
//     const headings = getStyledHeadings();
//     render(<RadioButtonPanel/>);
//     const radioButtonPanel = screen.getByTestId('radioButtonPanel');
//     fireEvent.change(screen.getByPlaceholderText(/log/i), { target: { value: 'a' } })
//     screen.debug();
//     expect(screen.getByPlaceholderText(/log/i)).toHaveValue('a');
//   });
  
//   test('log should change after submit', () => {
//     render(<RadioButtonPanel/>);
//     const logTable = screen.getByTestId('logTable');
//     fireEvent.change(screen.getByPlaceholderText(/log/i), { target: { value: 'a' } })
//     fireEvent.click(screen.getByText(/submit/i));
//     expect(screen.getByPlaceholderText(/log/i)).toHaveValue('');
//     expect(screen.getByRole(/listitem/i)).toHaveTextContent('a');
//     screen.debug();

//   });

    // describe('onChange()', () => {
    //     it('is called with the new checked value of the input on change', () => {
    //     const spy = jest.fn();
    //     const element = render(<RadioButtonPanel headings={['test1', 'test2','test3']}/>);
    //     (element.find('input').domNode).checked = true;
    //     element
    //         .find('input')
    //         .trigger('onChange', {currentTarget: {checked: true}});
    //     expect(spy).toHaveBeenCalledWith(true, 'MyRadioButton');
    //     });
    // });

});