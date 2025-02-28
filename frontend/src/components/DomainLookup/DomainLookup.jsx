import React from 'react';

const DomainLookup = ({ data }) => {
    return (
        <div className="mt-4">
            <h3>Lookup Results</h3>
            <table className="table table-bordered">
                <tbody>
                    {Object.entries(data).map(([key, value]) => (
                        <tr key={key}>
                            <th className='text-capitalize'>{key.replace(/([A-Z])/g, ' $1').trim()}</th>
                            <td>{value || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DomainLookup;
