"use client"

import { FaLanguage } from 'react-icons/fa';


interface DescriptionProps {
  language: string,
  description: string,
  keywords: string[]
}

const Description = ({ data }: { data: DescriptionProps }) => {

  const { language, description, keywords } = data;

  return (
    <section>
      <p className="py-2 px-4 flex gap-2 items-center mt-4 mb-8 border w-fit rounded-md border-gray-500 text-NEUTRAL">
        <FaLanguage fontSize="1.2rem" /> {language}
      </p>

      <h3 className=" text-lg sm:text-xl text-blue-500 font-bold">
        Description
      </h3>
      <article>
        <p className="text-NEUTRAL sm:pl-4 my-4 text-sm sm:text-md">
          {description}
        </p>
        {keywords.length > 0 && (
          <aside className="sm:pl-4">
            <h4 className="text-blue-300 font-bold text-md sm:text-lg mb-3">
              Keywords
            </h4>
            <ul className="flex gap-4 flex-wrap">
              {keywords.map((keyword, i) => (
                <li
                  className="text-NEUTRAL px-2 border-l-2 text-sm sm:text-md border-r-2"
                  key={i}
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>
    </section>
  );
};
 
export default Description;