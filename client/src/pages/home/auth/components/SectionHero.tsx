import { Link } from 'react-router-dom';
import Input from '../../../../ui/Input';
import Separator from './Separator';
import { ChevronRight } from 'lucide-react';

interface SectionHeroProps {
  email: string;
  setEmail: (email: string) => void;
}

const SectionHero = ({ email, setEmail }: SectionHeroProps) => {
  return (
    <>
      <section className="flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-lg mb-4">Watch anywhere. Cancel anytime</p>
        <p className="mb-4">
          {' '}
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <form className="flex flex-col md:flex-row gap-4 w-1/2">
          <Input
            name="email"
            placeholder="your@email.com"
            value={email}
            onChange={setEmail}
            screen="hero"
          />
          <Link
            to={'/login'}
            className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center"
          >
            Get Started
            <ChevronRight className="size-8 md:size-10" />
          </Link>
        </form>
      </section>
      <Separator />
    </>
  );
};

export default SectionHero;
