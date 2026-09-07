import { redirect } from 'next/navigation';

export default function UsefulResourcePage() {
  // "Recursos" se integró dentro de "Explorar".
  redirect('/contenidos');
}
