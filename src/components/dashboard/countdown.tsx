
'use client';

interface CountdownProps {
    timeLeft: {
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    };
}

export function Countdown({ timeLeft }: CountdownProps) {
    return (
        <div className="flex justify-center md:justify-start space-x-2 sm:space-x-4">
            <div className="text-center p-3 bg-primary text-primary-foreground rounded-lg w-20 sm:w-24">
                <div className="text-3xl sm:text-4xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="text-xs sm:text-sm uppercase">Days</div>
            </div>
             <div className="text-center p-3 bg-primary text-primary-foreground rounded-lg w-20 sm:w-24">
                <div className="text-3xl sm:text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs sm:text-sm uppercase">Hours</div>
            </div>
             <div className="text-center p-3 bg-primary text-primary-foreground rounded-lg w-20 sm:w-24">
                <div className="text-3xl sm:text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs sm:text-sm uppercase">Mins</div>
            </div>
             <div className="text-center p-3 bg-primary text-primary-foreground rounded-lg w-20 sm:w-24">
                <div className="text-3xl sm:text-4xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs sm:text-sm uppercase">Secs</div>
            </div>
        </div>
    );
}
