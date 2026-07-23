"use server"

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckIcon } from 'lucide-react';
import { SubscribeButton } from './SubscriveButton';
import { subscribeStatus } from '../../_actions/subscriveStatus';

const PricingSection = async () => {

  const res = await subscribeStatus()

  const active = Boolean(res.success && res.data.status === "ACTIVE")

  // console.log('status', active)

  return (
    <Card className='mx-auto max-w-md'>
      <CardHeader>
        <CardTitle className='flex items-center justify-between font-bold'>
          Premium Plan
          {active &&
            <Badge>Active</Badge>
          }
        </CardTitle>
        <CardDescription>
          {active ? `Expired on ${new Date(res.data.expiredEnd).toLocaleString()}` : "Unlock every premium sotry, cancel anytime"}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <ul className='space-y-2 text-sm'>
          <li className='flex items-center gap-2'>
            <CheckIcon className='size-4 text-primary'></CheckIcon>
            <p>Unlimited premium articles</p>
          </li>
          <li className='flex items-center gap-2'>
            <CheckIcon className='size-4 text-primary'></CheckIcon>
            <p>Access to new stories</p>
          </li>
          <li className='flex items-center gap-2'>
            <CheckIcon className='size-4 text-primary'></CheckIcon>
            <p>Support independent journalism</p>
          </li>
        </ul>
        {!active &&
          <SubscribeButton />
        }
      </CardContent>
    </Card>
  );
};

export default PricingSection;