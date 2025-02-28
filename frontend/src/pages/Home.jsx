import React, { useState } from 'react';
import axios from 'axios';
import DomainLookup from '../components/DomainLookup/DomainLookup';

const Home = () => {
    const [domain, setDomain] = useState('');
    const [type, setType] = useState('domain');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleLookup = async () => {
        try {
            setError('');
            setLoading(true);
            const response = await axios.get(`api/whois?domain=${domain}&type=${type}`);
            setData(response.data);

        } catch (err) {
            setError('Failed to retrieve data. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="container mt-5">
            <h2>Whois Domain Lookup</h2>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Enter domain (e.g., amazon.com)" value={domain} onChange={(e) => setDomain(e.target.value)} />
            </div>
            <div className="mb-3">
                <select className="form-control" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="domain">Domain Information</option>
                    <option value="contact">Contact Information</option>
                </select>
            </div>
            <button className="btn btn-info" onClick={handleLookup}>{loading ? (<div class="spinner-border" role="status"></div>) : 'Lookup'}</button>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {data && <DomainLookup data={data} />}
        </div>
    );
};

export default Home;
