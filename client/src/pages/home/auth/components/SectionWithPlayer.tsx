import type { AuthSectionProps } from '../../AuthScreen';
import Separator from './Separator';

const SectionWithPlayer = ({
  paragraphText,
  headerText,
  section,
}: AuthSectionProps) => (
  <>
    <section className="py-10 bg-black text-white">
      <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            {headerText}
          </h2>
          <p className="text-lg md:text-xl">{paragraphText}</p>
        </div>
        {section === 'tv' && (
          <div className="flex-1 relative">
            <img src="/tv.png" alt="tv image" className="mt-4 z-20 relative" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        )}
        {section === 'device' && (
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/device-pile.png"
              alt="device image"
              className="mt-4 z-20 relative"
            />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10 max-w-[63%]"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        )}
      </div>
    </section>
    <Separator />
  </>
);

export default SectionWithPlayer;
