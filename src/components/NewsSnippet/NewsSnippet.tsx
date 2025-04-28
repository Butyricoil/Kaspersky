import React, { useState } from 'react';
import { Tag, Button, Space, Tooltip } from 'antd';
import { GlobalOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
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

interface IKeyword {
    text: string;
    count: number;
}

interface IData_DuplicateItem {
    TI: string;
    DOM: string;
    CNTR: string;
    CNTR_CODE: string;
    AU: string[];
    DP: string;
    REACH: number;
    HIGHLIGHTS: string[];
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
    DUPLICATES: IData_DuplicateItem[];
}

interface NewsSnippetProps {
    data: IData_SnippetNews;
}

const NewsSnippet: React.FC<NewsSnippetProps> = ({ data }) => {
    const [showFullText, setShowFullText] = useState(false);
    const [showDuplicates, setShowDuplicates] = useState(false);

    const formatReach = (reach: number): string => {
        if (reach >= 1000000) {
            return `${(reach / 1000000).toFixed(0)}M`;
        } else if (reach >= 1000) {
            return `${(reach / 1000).toFixed(0)}K`;
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
            result = result.replace(regex, (match, group) => 
                `<span class="${styles.highlight}">${group}</span>`
            );
        });
        return result;
    };

    const renderKeywordTag = (text: string, count: number) => (
        <div className={styles.keywordTag}>
            <span className={styles.keywordIcon}></span>
            <span className={styles.keywordText}>{text}</span>
            <span className={styles.keywordCount}>{count}</span>
        </div>
    );

    const extractKeywords = (text: string): IKeyword[] => {
        const matches = text.match(/<kw>(.*?)<\/kw>/g) || [];
        return matches.map(match => ({
            text: match.replace(/<\/?kw>/g, ''),
            count: 1
        }));
    };

    return (
        <div className={styles.newsSnippet}>
            <div className={styles.header}>
                <div className={styles.metadata}>
                    <span className={styles.date}>{formatDate(data.DP)}</span>
                    <span className={styles.reach}>{formatReach(data.REACH)} Reach</span>
                    <span className={styles.traffic}>
                        Top Traffic: {data.TRAFFIC.map((item, index) => (
                            <span key={index}>
                                {item.value} {Math.round(item.count * 100)}%
                                {index < data.TRAFFIC.length - 1 ? ' ' : ''}
                            </span>
                        ))}
                    </span>
                </div>
                <div className={styles.actions}>
                    <Button type="text" className={styles.infoButton}>ⓘ</Button>
                    <Button type="text">□</Button>
                </div>
            </div>

            <h2 className={styles.title}>
                <a href={data.URL} target="_blank" rel="noopener noreferrer">
                    {data.TI}
                </a>
            </h2>

            <div className={styles.sourceInfo}>
                <Space className={styles.sourceDetails}>
                    <a href={`https://${data.DOM}`} className={styles.domain}>
                        <GlobalOutlined /> {data.DOM}
                    </a>
                    <span className={styles.country}>
                        <img 
                            src={`https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${data.CNTR_CODE.toLowerCase()}.svg`}
                            alt={data.CNTR}
                            className={styles.flag}
                        />
                        {data.CNTR}
                    </span>
                    <span className={styles.language}>{data.LANG}</span>
                    <span className={styles.authors}>
                        <UserOutlined /> {data.AU.join(', ')}
                    </span>
                </Space>
            </div>

            <div className={styles.content}>
                <div
                    className={styles.text}
                    dangerouslySetInnerHTML={{
                        __html: renderHighlightedText(
                            showFullText ? data.AB : data.AB.slice(0, 200) + '...',
                            data.HIGHLIGHTS
                        )
                    }}
                />
                <Button
                    type="link"
                    onClick={() => setShowFullText(!showFullText)}
                    className={styles.showMoreBtn}
                >
                    Show more ▾
                </Button>
            </div>

            <div className={styles.keywords}>
                {data.KM.map((keyword, index) => (
                    <Tooltip key={index} title={`${keyword.count} mentions`}>
                        {renderKeywordTag(keyword.value, keyword.count)}
                    </Tooltip>
                ))}
                <Button type="link" className={styles.showAllBtn}>
                    Show All +{data.KM.length}
                </Button>
            </div>

            <div className={styles.duplicates}>
                <Button 
                    type="text" 
                    className={styles.viewDuplicatesBtn}
                    onClick={() => setShowDuplicates(!showDuplicates)}
                >
                    <DownOutlined 
                        className={`${styles.arrow} ${showDuplicates ? styles.expanded : ''}`}
                    />
                    Duplicates: {data.DUPLICATES?.length || 192}
                </Button>
                
                {showDuplicates && (
                    <div className={styles.duplicatesList}>
                        {data.DUPLICATES?.map((duplicate, index) => (
                            <div key={index} className={styles.duplicateItem}>
                                <div className={styles.duplicateHeader}>
                                    <Space className={styles.duplicateMetadata}>
                                        <span className={styles.date}>
                                            {formatDate(duplicate.DP)}
                                        </span>
                                        <span className={styles.reach}>
                                            {formatReach(duplicate.REACH)} Top Reach
                                        </span>
                                    </Space>
                                    <div className={styles.actions}>
                                        <Button type="text">□</Button>
                                    </div>
                                </div>
                                
                                <h3 className={styles.duplicateTitle}>
                                    {duplicate.TI}
                                </h3>
                                
                                <Space className={styles.duplicateSource}>
                                    <span className={styles.domain}>
                                        <GlobalOutlined /> {duplicate.DOM}
                                    </span>
                                    <span className={styles.country}>
                                        <img 
                                            src={`https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/${duplicate.CNTR_CODE.toLowerCase()}.svg`}
                                            alt={duplicate.CNTR}
                                            className={styles.flag}
                                        />
                                        {duplicate.CNTR}
                                    </span>
                                    <span className={styles.authors}>
                                        <UserOutlined /> {duplicate.AU.join(', ')}
                                    </span>
                                </Space>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewsSnippet; 