import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import { Priority, Category } from '../../interfaces';
import toast from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';

export const TaskForm: React.FC = () => {
  const { addTask } = useTasks();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('work');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basit Validasyon (Doğrulama)
    if (!title.trim()) {
      toast.error('Lütfen bir görev başlığı girin.');
      return;
    }

    addTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      completed: false,
    });

    toast.success('Görev başarıyla eklendi!');
    
    // Formu temizle
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('work');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 mb-8 transition-colors duration-300"
    >
      <div className="flex flex-col gap-4">
        {/* Başlık Input'u */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Görev Başlığı *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ne yapmak istiyorsun?"
            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Açıklama Input'u */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Açıklama (İsteğe bağlı)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Görev hakkında detaylar..."
            rows={2}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Kategori Seçimi */}
          <div className="flex-1">
            <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Kategori
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            >
              <option value="work">İş</option>
              <option value="personal">Kişisel</option>
              <option value="health">Sağlık</option>
              <option value="education">Eğitim</option>
              <option value="other">Diğer</option>
            </select>
          </div>

          {/* Öncelik Seçimi */}
          <div className="flex-1">
            <label htmlFor="priority" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Öncelik Seviyesi
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            >
              <option value="low">Düşük</option>
              <option value="medium">Orta</option>
              <option value="high">Yüksek</option>
            </select>
          </div>
        </div>

        {/* Gönder Butonu */}
        <button
          type="submit"
          className="mt-2 w-full sm:w-auto self-end flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm shadow-primary-500/30"
        >
          <FiPlus className="w-5 h-5" />
          Görev Ekle
        </button>
      </div>
    </form>
  );
};
