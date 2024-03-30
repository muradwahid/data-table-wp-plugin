import Style from './Components/Style/Style';
import TableFront from './Components/theme/Table/TableFront';
import './style.scss';
import { createRoot } from 'react-dom/client';
// Block Name
function FrontEnd({attributes}) {
	return (
		<>
			<Style attributes={attributes} />
			<TableFront attributes={attributes} />
			{/* <p>data table</p> */}
    </>
  );
}

const container = document.querySelectorAll('.wp-block-bpdt-data-table');
container?.forEach(ele => {
	const attributes = JSON.parse(ele.dataset.attributes);
	const root = createRoot(ele);
	root.render(<FrontEnd attributes={attributes} />);
	ele?.removeAttribute('data-attributes');
})