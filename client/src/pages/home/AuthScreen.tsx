import useFormStore from '../../store/useFormStore';
import Navbar from './auth/components/Navbar';
import SectionHero from './auth/components/SectionHero';
import SectionWithImage from './auth/components/SectionWithImage';
import SectionWithPlayer from './auth/components/SectionWithPlayer';

export interface AuthSectionProps {
  headerText: string;
  paragraphText: string;
  section: 'tv' | 'device' | 'phone' | 'kids';
}

const AuthScreen = () => {
  const { email, setEmail } = useFormStore();
  return (
    <div className="hero-bg relative">
      <Navbar />
      <SectionHero email={email} setEmail={setEmail} />
      <SectionWithPlayer
        headerText="Enjoy on your TV"
        paragraphText="  Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blue-ray
          players and more."
        section="tv"
      />
      <SectionWithImage
        headerText="Download your shows to watch offline"
        paragraphText="Save your favorites easily and always have something to watch."
        section="phone"
      />
      <SectionWithPlayer
        headerText="Watch everywhere"
        paragraphText="Stream unlimited movies and TV shows on your phone, tablet, laptop and TV."
        section="device"
      />
      <SectionWithImage
        headerText="Create profiles for kids"
        paragraphText="Send kids on adventures with their favorite characters in a space made just for them-free with your membership."
        section="kids"
      />
    </div>
  );
};

export default AuthScreen;
