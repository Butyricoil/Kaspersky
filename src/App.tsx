import React from 'react';
import { ConfigProvider, theme } from 'antd';
import NewsSnippet from './components/NewsSnippet/NewsSnippet';
import 'antd/dist/reset.css';
import './App.css';

const mockData = {
    ID: 260855433,
    TI: "Mobile bankers left vulnerable: 47% of UK consumers manage finances on insecure smartphones",
    AB: "Mobile bankers left vulnerable: 47% of UK consumers manage finances on insecure smartphones. A new study by Kaspersky has revealed that nearly half of UK consumers are managing their finances on smartphones that lack proper security measures. The research highlights the growing risk of financial fraud as more people turn to mobile banking without adequate protection.",
    URL: "https://example.com/news/123",
    DOM: "globalsecuritymag.com",
    DP: "2025-03-06T21:00:00",
    LANG: "en",
    REACH: 2392,
    TRAFFIC: [
        { value: "India", count: 0.779 },
        { value: "USA", count: 0.101 },
        { value: "UK", count: 0.05 }
    ],
    KM: [
        { value: "antivirus", count: 10 },
        { value: "kaspersky", count: 5 },
        { value: "mobile banking", count: 8 },
        { value: "security", count: 12 },
        { value: "cybersecurity", count: 7 }
    ],
    AU: ["John Smith", "Jane Doe"],
    CNTR: "United Kingdom",
    CNTR_CODE: "GB",
    SENT: "negative",
    FAV: "https://example.com/favicon.ico",
    HIGHLIGHTS: [
        "...<kw>Kaspersky</kw> research...",
        "...<kw>mobile banking</kw> security..."
    ]
};

function App() {
    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                    colorPrimary: '#58a6ff',
                    colorBgContainer: '#0d1117',
                    colorBgElevated: '#161b22',
                    colorBorder: '#30363d',
                    colorText: '#c9d1d9',
                    colorTextSecondary: '#8b949e',
                    borderRadius: 6,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
                },
            }}
        >
            <div className="App">
                <NewsSnippet data={mockData} />
            </div>
        </ConfigProvider>
    );
}

export default App;
