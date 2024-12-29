import './SpecificationMenu.css';

const SpecificationMenu = ({groupedAttributes, setAllSpecifications}) => {

    const handleCheckBoxClick = (value) => {

        setAllSpecifications(prevState => prevState.map(att => 

            att.name === value ? {...att, selected : !att.selected} : att
        ))

    }

    return (
        <div>
            
            {groupedAttributes && groupedAttributes.map(att => (
                
                <div>
                    <p style={{fontSize: 20, fontWeight: 600, marginBottom: 10}}>{att.name}</p>
                    {att.data && att.data.map(d => (
                    <div key={d} className="checkbox-con">
                        <input type="checkbox" id={d} onChange={() => handleCheckBoxClick(d)} />
                        <label htmlFor={d}>{d}</label>
                    </div>
                    ))}
                    <div style={{width: "100%" ,height: "1px", background: "#aaa3a3", marginTop: 10, marginBottom: 10}}></div>
                </div>
            )
            
            )}
        </div>
    );


};

export default SpecificationMenu;