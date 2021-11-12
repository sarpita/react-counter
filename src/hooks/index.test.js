import {render, waitFor} from '@testing-library/react';
import useFetch from "./index";
import React from "react";

function TestComponent({url = 'https://bakesaleforgood.com/api/deals'}) {

  const {loading, response, error} = useFetch(url);
  return (
    <div>
      {loading && <div data-testid={'loading'}>loading</div>}
      {response &&
      <div data-testid={'response'}>{response.map((deal, index) => (<span key={index}>{deal.title}</span>))}</div>}
      {error && <div data-testid={'error'}>{error}</div>}
    </div>
  )
}

describe('useFetch hook', () => {

  test('should return initial status, data upon call', async () => {
    const {queryByTestId, getByTestId} = render(<TestComponent/>);
    expect(queryByTestId('loading')).toBeInTheDocument();
    await waitFor(() => getByTestId('response'));
    expect(queryByTestId('loading')).not.toBeInTheDocument()
    expect(queryByTestId('response')).toBeInTheDocument();
  });

  test('should return error upon call', async () => {
    const {queryByTestId, getByTestId} = render(<TestComponent url={'https://bakesalrgood.com/api/deas'}/>);
    expect(queryByTestId('loading')).toBeInTheDocument();
    await waitFor(() => getByTestId('error'));
    expect(queryByTestId('error').innerHTML).toBe('Network request failed');
    expect(queryByTestId('loading')).not.toBeInTheDocument();
    expect(queryByTestId('response')).not.toBeInTheDocument();
  });
});

