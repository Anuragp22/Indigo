import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Loader from '../loader';
import { useSubscription } from '@/hooks/useSubscription';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertCircle } from 'lucide-react';

const PaymentButton = () => {
    const [showDialog, setShowDialog] = useState(false);
    const { isProcessing } = useSubscription();

    const handleClick = () => {
        setShowDialog(true);
    };

    return (
        <>
            <Button
                className="text-sm w-full"
                onClick={handleClick}
            >
                <Loader
                    color="#000"
                    state={isProcessing}
                >
                    Upgrade
                </Loader>
            </Button>

            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                            Payment System Unavailable
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-4">
                            <p>
                                We apologize, but our payment system is currently unavailable.
                                We&apos;re working hard to restore the service.
                            </p>
                            <p className="font-medium">
                                Please check back later or contact our support team for assistance.
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="w-full sm:w-auto">Close</AlertDialogCancel>
                        <AlertDialogAction
                            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
                            onClick={() => window.location.href = 'mailto:support@example.com'}
                        >
                            Contact Support
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default PaymentButton;