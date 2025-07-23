import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { TagInput } from '@/components/ui/tag-input';
import { PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewCertificateForm {
  appName: string;
  appOwner: string;
  appSPOC: string;
  dns: string;
  ca: string;
  san: string[];
  remarks: string;
}

const NewCertificate: React.FC = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<NewCertificateForm>({
    defaultValues: { ca: 'Godaddy', san: [] }
  });

  const san = watch('san') || [];

  const onSubmit = (data: NewCertificateForm) => {
    // Simulate API call
    console.log('New Certificate Request:', data);
    toast({
      title: "Certificate request submitted",
      description: `Request for ${data.dns} has been submitted successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <PlusCircle className="h-8 w-8" />
          New Certificate Request
        </h1>
        <p className="text-muted-foreground">Request a new SSL certificate for your domain</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Certificate Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="appName">App Name *</Label>
                <Input {...register('appName', { required: 'App Name is required' })} />
                {errors.appName && <p className="text-sm text-destructive">{errors.appName.message}</p>}
              </div>
              <div>
                <Label htmlFor="appOwner">App Owner *</Label>
                <Input {...register('appOwner', { required: 'App Owner is required' })} />
                {errors.appOwner && <p className="text-sm text-destructive">{errors.appOwner.message}</p>}
              </div>
              <div>
                <Label htmlFor="appSPOC">App SPOC *</Label>
                <Input {...register('appSPOC', { required: 'App SPOC is required' })} />
                {errors.appSPOC && <p className="text-sm text-destructive">{errors.appSPOC.message}</p>}
              </div>
              <div>
                <Label htmlFor="dns">DNS *</Label>
                <Input {...register('dns', { required: 'DNS is required' })} />
                {errors.dns && <p className="text-sm text-destructive">{errors.dns.message}</p>}
              </div>
            </div>

            <div>
              <Label>Certificate Authority</Label>
              <Select defaultValue="Godaddy" onValueChange={(value) => setValue('ca', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Godaddy">Godaddy</SelectItem>
                  <SelectItem value="DigiCert">DigiCert</SelectItem>
                  <SelectItem value="Let's Encrypt">Let's Encrypt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>SAN (Subject Alternative Names)</Label>
              <TagInput
                value={san}
                onChange={(tags) => setValue('san', tags)}
                placeholder="Enter SAN domains and press Enter"
              />
            </div>

            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea {...register('remarks')} placeholder="Additional notes or requirements" />
            </div>

            <Button type="submit" className="bg-gradient-primary hover:bg-primary-glow">
              Submit Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewCertificate;