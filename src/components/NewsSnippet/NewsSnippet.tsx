import React, { useState } from 'react';
import { Card, Tag, Button, Space, Tooltip } from 'antd';
import { GlobalOutlined, CopyOutlined, EllipsisOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './NewsSnippet.module.scss';

interface IData_TagItem {
    value: string;
    count: number;
}

interface IData_TrafficItem {
    value: string;
    count: number;
}

interface IData_SnippetNews {
    ID: number;
    TI: string;
    AB: string;
    URL: string;
    DOM: string;
    DP: string;
    LANG: string;
    REACH: number;
    KM: IData_TagItem[];
    AU: string[];
    CNTR: string;
    CNTR_CODE: string;
    SENT: string;
    TRAFFIC: IData_TrafficItem[];
    FAV: string;
    HIGHLIGHTS: string[];
}

interface NewsSnippetProps {
    data: IData_SnippetNews;
}

const NewsSnippet: React.FC<NewsSnippetProps> = ({ data }) => {
    const [showFullText, setShowFullText] = useState(false);

    const formatReach = (reach: number): string => {
        if (reach >= 1000000) {
            return `${(reach / 1000000).toFixed(1)}K`;
        } else if (reach >= 1000) {
            return `${(reach / 1000).toFixed(1)}K`;
        }
        return reach.toString();
    };

    const formatDate = (dateString: string): string => {
        return dayjs(dateString).format('DD MMM YYYY');
    };

    const renderHighlightedText = (text: string, highlights: string[]) => {
        let result = text;
        highlights.forEach(highlight => {
            const regex = /<kw>(.*?)<\/kw>/g;
            result = result.replace(regex, '<mark>$1</mark>');
        });
        return result;
    };

    const renderTraffic = () => {
        return data.TRAFFIC.slice(0, 3).map((item, index) => (
            <span key={index} className={styles.trafficItem}>
                {item.value} {Math.round(item.count * 100)}%
                {index < Math.min(2, data.TRAFFIC.length - 1) ? ' ' : ''}
            </span>
        ));
    };

    return (
        <div className={styles.newsSnippet}>
            <div className={styles.header}>
                <div className={styles.metadata}>
                    <span className={styles.date}>{formatDate(data.DP)}</span>
                    <span className={styles.reach}>{formatReach(data.REACH)} Reach</span>
                    <span className={styles.traffic}>
                        Top Traffic: {renderTraffic()}
                    </span>
                    {data.LANG && (
                        <span className={styles.language}>{data.LANG.toUpperCase()}</span>
                    )}
                    <Tag className={styles.sentiment} color={data.SENT === 'positive' ? 'success' : 'default'}>
                        {data.SENT}
                    </Tag>
                </div>
                <div className={styles.actions}>
                    <Button type="text" icon={<CopyOutlined />} />
                    <Button type="text" icon={<EllipsisOutlined />} />
                </div>
            </div>

            <div className={styles.content}>
                <h2 className={styles.title}>
                    <a href={data.URL} target="_blank" rel="noopener noreferrer">
                        {data.TI}
                    </a>
                </h2>

                <div className={styles.source}>
                    <GlobalOutlined />
                    <a href={`https://${data.DOM}`} target="_blank" rel="noopener noreferrer">
                        {data.DOM}
                    </a>
                    {data.AU.length > 0 && (
                        <span className={styles.authors}>
                            • {data.AU.join(', ')}
                        </span>
                    )}
                </div>

                <div className={styles.text}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: renderHighlightedText(
                                showFullText ? data.AB : data.AB.slice(0, 200) + '...',
                                data.HIGHLIGHTS
                            )
                        }}
                    />
                    {data.AB.length > 200 && (
                        <Button
                            type="link"
                            onClick={() => setShowFullText(!showFullText)}
                            className={styles.showMoreBtn}
                        >
                            {showFullText ? 'Show less' : 'Show more'} ▾
                        </Button>
                    )}
                </div>

                <div className={styles.tags}>
                    {data.KM.map((tag, index) => (
                        <div key={index} className={styles.tagWrapper}>
                            <span className={styles.tagText}>{tag.value}</span>
                            <span className={styles.tagCount}>{tag.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsSnippet; 