import type { AuthSectionProps } from '../../AuthScreen';
import Separator from './Separator';

const SectionWithImage = ({
  headerText,
  paragraphText,
  section,
}: AuthSectionProps) => {
  const textClasses = section === 'kids' ? 'text-left' : 'text-center';
  return (
    <>
      <section className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
          <div className="flex-1 relative">
            {section === 'phone' && (
              <div className="relative">
                <img src="/stranger-things-lg.png" alt="stranger things" />
                <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2">
                  <img
                    src="/stranger-things-sm.png"
                    alt="stranger things"
                    className="h-full"
                  />
                  <div className="flex justify-between items-center w-full">
                    <div className="flex flex-col gap-0">
                      <span className="text-md lg:text-lg font-bold">
                        Stranger Things
                      </span>
                      <span className="text-sm text-blue-500">
                        Downloading...
                      </span>
                    </div>
                    <img
                      src="/download-icon.gif"
                      alt="download"
                      className="h-12"
                    />
                  </div>
                </div>
              </div>
            )}
            {section === 'kids' && (
              <img src="/kids.png" alt="Enjoy on your TV" className="mt-4" />
            )}
          </div>
          <div className="flex-1">
            <h2
              className={`text-4xl md:text-5xl font-extrabold mb-4 text-balance  md:text-left ${textClasses}`}
            >
              {headerText}
            </h2>
            <p className={`text-lg md:text-xl  ${textClasses}`}>
              {paragraphText}
            </p>
          </div>
        </div>
      </section>
      <Separator />
    </>
  );
};

export default SectionWithImage;
