const NewsCard = ({ article }) => {
    
    return ( 
       
        <div className="flex px-3 py-3">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <img
                    className="w-full h-48 object-cover"
                    src={article.urlToImage || "https://via.placeholder.com/400"}
                    alt={article.title}
                />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{article.title}</div>
                    <p className="text-gray-700 text-base">
                        {article.description}
                    </p>
                </div>
                <div className="px-6 py-4">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        {article.source?.name || "Unknown Source"}
                    </span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold hover:bg-blue-600"
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;
